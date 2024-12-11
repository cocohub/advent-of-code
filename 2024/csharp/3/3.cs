class Day3
{
    const string DAY = "THREE";

    public static void PartOne()
    {
        try
        {
            string input = Tools.ReadFile("3", "input.txt");

            Console.WriteLine($"The answer to Day {DAY}, part ONE is: ...");
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

            Console.WriteLine($"The answer to Day {DAY}, part TWO is: ...");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}