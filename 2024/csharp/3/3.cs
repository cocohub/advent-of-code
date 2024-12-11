using System.Text.RegularExpressions;

class Day3
{
    const string DAY = "THREE";

    private static int Multiply(string input)
    {
        string pattern = @"\d+";

        MatchCollection digitMatches = Regex.Matches(input, pattern);

        return int.Parse(digitMatches[0].Value) * int.Parse(digitMatches[1].Value);
    }

    public static void PartOne()
    {
        try
        {
            string input = Tools.ReadFile("3", "input.txt");

            string pattern = @"mul\(\d+,\d+\)";

            int total = 0;

            MatchCollection matches = Regex.Matches(input, pattern);

            foreach (Match match in matches)
            {
                total += Multiply(match.Value);
            }


            Console.WriteLine($"The answer to Day {DAY}, part ONE is: {total}");
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
            string input = Tools.ReadFile("3", "input.txt");

            string pattern = @"(mul\(\d+,\d+\)|do\(\)|don\'t\(\))";

            int total = 0;
            bool shouldAdd = true;

            MatchCollection matches = Regex.Matches(input, pattern);

            foreach (Match match in matches)
            {
                string value = match.Value.Trim();

                Console.WriteLine(value);

                if (value == "do()")
                {
                    shouldAdd = true;
                    continue;
                }
                else if (value == "don't()")
                {
                    shouldAdd = false;
                    continue;
                }
                else if (shouldAdd)
                {
                    total += Multiply(value);
                }
            }

            Console.WriteLine($"The answer to Day {DAY}, part TWO is: {total}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}