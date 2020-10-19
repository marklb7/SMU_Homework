import csv

csvpath = r"Resources\budget_data.csv"
print(csvpath)

totalMonths = 0
totalProfit = 0

lastRowProfit = 0

# read in the file
with open(csvpath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

    # Read the header row first (skip this step if there is no header)
    csv_header = next(csvreader)
    # print(f"CSV Header: {csv_header}")

    # Read each row of data after the header
    for row in csvreader:
        # print(row)

        #row[0] = Month-Year
        #row[1] = Profit/Loss

        totalMonths += 1
        totalProfit += int(row[1])


        # if first row, do nothing, but set lastRowProfit
        #otherwise, get the change
        #row - last row profit
        # add to dictionary with month as the key
        # update last row profit
        #continue loop

print(totalMonths)
print(totalProfit)