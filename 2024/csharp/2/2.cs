class Day2
{
    const string DAY = "TWO";

    public static bool CheckArraySafety(string[] numbers)
    {
        bool isIncreasing = int.Parse(numbers[0].Trim()) < int.Parse(numbers[1].Trim());
        bool isSafe = true;

        for (int i = 0; i < numbers.Length - 1; i++)
        {
            int n1 = int.Parse(numbers[i].Trim());
            int n2 = int.Parse(numbers[i + 1].Trim());

            if (Math.Abs(n1 - n2) > 3 || Math.Abs(n1 - n2) == 0)
            {
                isSafe = false;
                break;
            }

            if ((isIncreasing && n1 > n2) || (!isIncreasing && n1 < n2))
            {
                isSafe = false;
                break;
            }
        }

        return isSafe;
    }

    public static void PartOne()
    {
        try
        {
            string input = Tools.ReadFile("2", "input.txt");
            int total = 0;

            foreach (var line in input.Split('\n'))
            {
                string[] numbers = Tools.SplitByWhitespace(line);

                if (CheckArraySafety(numbers))
                {
                    total++;
                }
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
            string input = Tools.ReadFile("Day2", "input.txt");
            int total = 0;

            foreach (var line in input.Split('\n'))
            {
                string[] numbers = Tools.SplitByWhitespace(line);

                if (CheckArraySafety(numbers))
                {
                    total++;
                }
                else
                {
                    for (int i = 0; i < numbers.Length; i++)
                    {
                        string[] newNumbers = numbers.Where((source, index) => index != i).ToArray();

                        if (CheckArraySafety(newNumbers))
                        {
                            total++;
                            break;
                        }
                    }
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