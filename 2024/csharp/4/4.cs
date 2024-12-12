class Day4
{
    const string DAY = "FOUR";

    public static bool IsMatch(string text)
    {
        if (text == "XMAS" || text == "SAMX") { return true; }
        return false;
    }

    public static void PartOne()
    {
        string input = Tools.ReadFile("4", "input.txt");
        string[] lines = input.Split('\n');

        string targetString = "XMAS";
        int targetLength = targetString.Length;

        int rows = lines.Length;
        int cols = lines[0].Length;

        int total = 0;

        // Check words horizontally
        for (int y = 0; y < rows; y++)
        {
            for (int x = 0; x < cols; x++)
            {
                if (x + targetLength <= cols)
                {
                    string word = $"{lines[y][x]}{lines[y][x + 1]}{lines[y][x + 2]}{lines[y][x + 3]}";

                    if (IsMatch(word))
                    {
                        total++;
                    }
                }
            }
        }

        // Check words vertically
        for (int x = 0; x < cols; x++)
        {
            for (int y = 0; y < rows; y++)
            {

                if (y + targetLength <= rows)
                {
                    string word = $"{lines[y][x]}{lines[y + 1][x]}{lines[y + 2][x]}{lines[y + 3][x]}";

                    if (IsMatch(word))
                    {
                        total++;
                    }
                }
            }
        }

        // Check words diagonally, left to right
        for (int y = 0; y < rows; y++)
        {
            for (int x = 0; x < cols; x++)
            {
                if (x + targetLength <= cols && y + targetLength <= rows)
                {
                    string word = $"{lines[y][x]}{lines[y + 1][x + 1]}{lines[y + 2][x + 2]}{lines[y + 3][x + 3]}";

                    if (IsMatch(word))
                    {
                        total++;
                    }
                }
            }
        }

        // Check words diagonally, right to left
        for (int y = 0; y < rows; y++)
        {
            for (int x = cols - 1; x >= 0; x--)
            {
                if (x - targetLength >= -1 && y + targetLength <= rows)
                {
                    string word = $"{lines[y][x]}{lines[y + 1][x - 1]}{lines[y + 2][x - 2]}{lines[y + 3][x - 3]}";

                    if (IsMatch(word))
                    {
                        total++;
                    }
                }
            }
        }

        Console.WriteLine($"The answer to Day {DAY}, part ONE is: {total}");
    }

    public static void PartTwo()
    {
        try
        {
            string input = Tools.ReadFile("4", "input.txt");

            Console.WriteLine($"The answer to Day {DAY}, part TWO is: ...");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}