class Day8
{
    const string DAY = "EIGHT";

    public static void PartOne()
    {
        string input = Tools.ReadFile("8", "input.txt");
        string[] lines = input.Split("\n");

        int rows = lines.Length;
        int cols = lines[0].Length;

        Dictionary<char, List<(int x, int y)>> map = [];
        Dictionary<string, (int x, int y)> points = [];

        // Find all the characters
        for (int y = 0; y < rows; y++)
        {
            for (int x = 0; x < cols; x++)
            {
                if (lines[y][x] != '.')
                {
                    char c = lines[y][x];
                    if (!map.ContainsKey(c))
                    {
                        map[c] = [];
                    }

                    map[c].Add((x, y));
                }
            }
        }

        // For each character found on the map
        foreach (var c in map)
        {
            // For each instance of the character (all a, b or c for example)
            for (int i = 0; i < c.Value.Count; i++)
            {
                var current = c.Value[i];

                // Look for opposite points from the current and next character
                foreach (var next in c.Value.Skip(i + 1))
                {
                    int xDiff = Math.Abs(current.x - next.x);
                    int yDiff = Math.Abs(current.y - next.y);

                    // Calculate if the next point is to the left or right of the current point
                    int directionCurrent = current.x < next.x ? -1 : 1;
                    int directionNext = next.x < current.x ? -1 : 1;

                    int currentNewPoint = current.x + (directionCurrent * xDiff);
                    int nextNewPoint = next.x + (directionNext * xDiff);

                    // Save unique points
                    if (currentNewPoint >= 0 && currentNewPoint < cols && current.y - yDiff >= 0)
                    {
                        int currentNewPointY = current.y - yDiff;
                        points[$"x{currentNewPoint},y{currentNewPointY}"] = (currentNewPoint, currentNewPointY);
                    }

                    if (nextNewPoint >= 0 && nextNewPoint < cols && next.y + yDiff < rows)
                    {
                        int nextNewPointY = next.y + yDiff;
                        points[$"x{nextNewPoint},y{nextNewPointY}"] = (nextNewPoint, nextNewPointY);
                    }
                }
            }
        }

        Console.WriteLine($"The answer to Day {DAY}, part ONE is: {points.Count}");
    }

    public static void PartTwo()
    {
        string input = Tools.ReadFile("8", "input.txt");
        string[] lines = input.Split("\n");

        long total = 0;

        Console.WriteLine($"The answer to Day {DAY}, part TWO is: {total}");
    }
}