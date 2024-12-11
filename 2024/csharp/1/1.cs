
using System.Text.RegularExpressions;

class Day1
{
    public static List<int>[] CreateLists()
    {
        string fileContent = Tools.ReadFile("1", "input.txt");

        List<int>[] lists = [[], []];

        // Append each list value from line
        foreach (var line in fileContent.Split('\n'))
        {
            string[] values = Regex.Split(line.Trim(), @"\s+"); // Split by whitespace

            for (int i = 0; i < values.Length; i++)
            {
                string value = values[i].Trim();
                lists[i].Add(int.Parse(value));
            }
        }

        // Sort each list
        foreach (var list in lists)
        {
            list.Sort();
        }

        return lists;
    }

    public static void PartOne()
    {
        try
        {

            List<int>[] lists = CreateLists();
            int total = 0;

            // Calculate total
            for (int i = 0; i < lists[0].Count(); i++)
            {
                int n1 = lists[0][i];
                int n2 = lists[1][i];

                total += Math.Abs(n1 - n2);
            }

            Console.WriteLine($"The answer to Day ONE, part ONE is: {total}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }

    public static void PartTwo()
    {
        try
        {
            List<int>[] lists = CreateLists();
            int total = 0;

            // Find how many times a number from list 1 occurs in list 2
            // Then multiply the number by the number of occurrences
            for (int i = 0; i < lists[0].Count(); i++)
            {
                int n = lists[0][i];
                int nOccurrences = lists[1].FindAll((int nn) => n == nn).Count();

                total += n * nOccurrences;
            }

            Console.WriteLine($"The answer to Day ONE, part TWO is: {total}");

        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}