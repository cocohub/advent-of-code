using System.Text.RegularExpressions;

class Day7
{
    const string DAY = "SEVEN";

    public static void PartOne()
    {
        string input = Tools.ReadFile("7", "input.txt");
        string[] lines = input.Split("\n");

        long total = 0;

        char[] operators = ['+', '*'];

        foreach (var line in lines)
        {
            string pattern = @"\d+";
            MatchCollection matches = Regex.Matches(line, pattern);

            long expected = long.Parse(matches[0].Value);

            long[] numbers = matches.Skip(1).Select(m => long.Parse(m.Value)).ToArray();

            int operations = numbers.Length - 1;
            int possibilities = (int)Math.Pow(operators.Length, operations);

            List<char[]> operationVariations = [];

            for (int i = 0; i < possibilities; i++)
            {
                char[] chars = Convert.ToString(i, 2).PadLeft(operations, '0').Replace('0', '+').Replace('1', '*').ToCharArray();
                operationVariations.Add(chars);
            }

            foreach (var variation in operationVariations)
            {
                long result = numbers[0];

                for (int i = 0; i < variation.Length; i++)
                {
                    if (variation[i] == '+')
                    {
                        result += numbers[i + 1];
                    }
                    else
                    {
                        result *= numbers[i + 1];
                    }
                }

                if (result == expected)
                {
                    total += result;
                    break;
                }
            }
        }

        Console.WriteLine($"The answer to Day {DAY}, part ONE is: {total}");
    }

    public static void PartTwo()
    {
        string input = Tools.ReadFile("7", "input.txt");
        string[] lines = input.Split("\n\n");

        int total = 0;

        Console.WriteLine($"The answer to Day {DAY}, part TWO is: {total}");
    }
}