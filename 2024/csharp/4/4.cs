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

        // Initialize the 2D array
        char[,] array = new char[rows, cols];

        // Populate the 2D array
        for (int y = 0; y < rows; y++)
        {
            for (int x = 0; x < cols; x++)
            {
                array[y, x] = lines[y][x];
            }
        }

        // Check words horizontally
        for (int y = 0; y < rows; y++)
        {
            for (int x = 0; x < cols; x++)
            {
                if (x + targetLength <= cols)
                {
                    string word = $"{array[y, x]}{array[y, x + 1]}{array[y, x + 2]}{array[y, x + 3]}";

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
                    string word = $"{array[y, x]}{array[y + 1, x]}{array[y + 2, x]}{array[y + 3, x]}";

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
                    string word = $"{array[y, x]}{array[y + 1, x + 1]}{array[y + 2, x + 2]}{array[y + 3, x + 3]}";

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
                    string word = $"{array[y, x]}{array[y + 1, x - 1]}{array[y + 2, x - 2]}{array[y + 3, x - 3]}";

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