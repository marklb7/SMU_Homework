#Imports csv dependencies
import csv

#csv file path
csvpath = r"Submission/PyPoll/Resources/election_data.csv"

#Set total initial vote count to zero
total_votes = 0

#Creates initial empty dictionary
candidate_dictionary = {}

with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    #Read the header row first
    csv_header = next(csvreader)

    #Read each row of data after the header
        #row[0] = Voter ID
        #row[1] = County
        #row[2] = Candidate
    for row in csvreader:
        #Keeps a total count of each vote
        total_votes += 1
        candidate = row[2]
        #checks if candidate is in dictionary. Counts the vote if they are already in dictionary. Adds them to dictionary if they are not and begins counting if they are not.
        if candidate in candidate_dictionary.keys():
            candidate_dictionary[candidate] += 1
        else:
            candidate_dictionary[candidate] = 1 

#Pulls the candidate with the most votes from the dictionary. From Stack Overflow
winner = max(candidate_dictionary, key=candidate_dictionary.get)

#Calculates the percent of votes received for each candidate and creates summary
vote_results = {}
summary = []
for key in candidate_dictionary.keys():
    percentage = round((candidate_dictionary[key] / total_votes) * 100, 3)
    vote_results[key] = percentage
    results = f"{key}: {percentage}% ({candidate_dictionary[key]})"
    summary.append(results)
    final_results = "\n".join(summary)

#Puts summary into single string

summary_table = f"""Election Results
-------------------------
Total Votes: {total_votes}
-------------------------
{final_results}
-------------------------
Winner: {winner}
-------------------------"""

#Prints election results
print(summary_table)

#Exports summary to new csv file
with open("election_results.txt", "w") as file:
    file.write(summary_table)