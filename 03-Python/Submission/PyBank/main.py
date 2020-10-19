#Imports csv dependencies
import csv

#csv file path
csvpath = r"Submission/PyBank/Resources/budget_data.csv"

#Set total initial months and profit count to zero
total_months = 0
total_profit = 0
first_row = True
last_profit = 0
monthly_change = {}

#Creates initial empty dictionary
candidate_dictionary = {}

with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    #Read the header row first
    csv_header = next(csvreader)

    #Read each row of data after the header
        #row[0] = Date
        #row[1] = Profit/Loss
    for row in csvreader:
        #Keeps a total count of months and profit
        total_months += 1
        total_profit += int(row[1])
        #Calculates monthly change of profits and adds to dictionary
        if first_row:
            last_profit = int(row[1])
            first_row = False
        else:
            change = int(row[1]) - last_profit
            monthly_change[row[0]] = change
            last_profit = int(row[1])

#Calculates average monthly change
average_change = round(sum(monthly_change.values()) / len(monthly_change.keys()),2)

#Pulls the month and dollar amounts with the biggest increase and decrease from the dictionary. From Stack Overflow
max_change_month = max(monthly_change, key=monthly_change.get)
max_change_value = monthly_change[max_change_month]
min_change_month = min(monthly_change, key=monthly_change.get)
min_change_value = monthly_change[min_change_month]

#Puts summary into single string
summary_table = f"""Financial Analysis
-------------------------
Total Months: {total_months}
Total: ${total_profit}
Average Change: ${average_change}
Greatest Increase in Profits: {max_change_month} (${max_change_value})
Greatest Decrease in Profits: {min_change_month} (${min_change_value})"""

#Prints financial results
print(summary_table)

#Exports summary to new csv file
with open("financial_analysis.txt", "w") as file:
    file.write(summary_table)