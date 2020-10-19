import csv

csvpath = r"Resources\election_data.csv"
print(csvpath)

#init total votes
totalVotes = 0

#init candidate counts
# correyCount = 0
# khanCount = 0
# liCount = 0
# otoolCount = 0

candidateDict = {}

# read in the file
with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    # Read the header row first (skip this step if there is no header)
    csv_header = next(csvreader)
    #print(f"CSV Header: {csv_header}")

    # Read each row of data after the header
    for row in csvreader:
        # print(row)
        totalVotes += 1

        #row[0] = Voter ID
        #row[1] = County
        #row[2] = Candidate

        # if candidate is in the dictionary
        # then add 1 to the value

        # if the candidate is not in the dictionary
        # create a new item, initialize value 1

        candidate = row[2]
        if candidate in candidateDict.keys():
            candidateDict[candidate] += 1
        else:
            candidateDict[candidate] = 1

        # if row[2] == "Khan":
        #     khanCount += 1
        # elif row[2] == "Correy":
        #     correyCount += 1
        # elif row[2] == "Li":
        #     liCount += 1
        # elif row[2] == "O'Tooley":
        #     otoolCount += 1
        # else:
        #     print("Candidate not found")
# print(f"Khan Count: {khanCount}, Li Count: {liCount}, Correy Count: {correyCount}, O'Tooley Count: {otoolCount}")

#https://stackoverflow.com/questions/268272/getting-key-with-maximum-value-in-dictionary
winner = max(candidateDict, key=candidateDict.get) #stolen from the internet

# step by step
# save all the percents for candidates in a new dictionary
percentDict = {}
for key in candidateDict.keys():
    perc = candidateDict[key] / totalVotes
    percentDict[key] = perc

print(percentDict)

# create our list of text to write out - per candidate
listOfStrings = []
for key in percentDict.keys():
    myString = key + ": " + str(round(percentDict[key], 3) * 100) + "% (" + str(candidateDict[key]) + ")"
    listOfStrings.append(myString)

print(listOfStrings)

finalString = "\n".join(listOfStrings)

# candidateStrings = [f"{key}: {round((candidateDict[key] / totalVotes)*100,3)}% ({candidateDict[key]})" for key in candidateDict.keys()]
# candidateStrings = "\n".join(candidateStrings)

summaryString = f"""Election Results
-------------------------
Total Votes: {totalVotes}
-------------------------
{finalString}
-------------------------
Winner: {winner}
-------------------------"""

#write summary string
with open("poll_results.txt", "w") as file1:
    file1.write(summaryString)
