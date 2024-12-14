class Map
{
    public string[] Rows { get; set; }
    public int RowsCount => Rows.Length;
    public int ColsCount => Rows[0].Length;

    public Map(string[] rows)
    {
        Rows = rows;
    }

    public (int x, int y) GetGuardStartingPosition()
    {
        for (int y = 0; y < RowsCount; y++)
        {
            for (int x = 0; x < ColsCount; x++)
            {
                if (GetElement(x, y) == '^')
                {
                    return (x, y);
                }
            }
        }

        return (-1, -1);
    }

    public char? GetElement(int x, int y)
    {
        try
        {
            return Rows[y][x];
        }
        catch
        {
            return null;
        }
    }
}

public enum Direction
{
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

class Guard
{
    public Direction Direction { get; set; }
    public int X { get; set; }
    public int Y { get; set; }

    public Guard(int _x, int _y)
    {
        Direction = Direction.Up;
        X = _x;
        Y = _y;
    }

    public (int x, int y) NextCoordinates()
    {
        switch (Direction)
        {
            case Direction.Up:
                return (X, Y - 1);
            case Direction.Down:
                return (X, Y + 1);
            case Direction.Left:
                return (X - 1, Y);
            case Direction.Right:
                return (X + 1, Y);
            default:
                return (-1, -1);
        }
    }

    public bool Move(char? nextElement)
    {
        if (nextElement == '.')
        {
            switch (Direction)
            {
                case Direction.Up:
                    Y--;
                    break;
                case Direction.Down:
                    Y++;
                    break;
                case Direction.Left:
                    X--;
                    break;
                case Direction.Right:
                    X++;
                    break;
                default:
                    break;
            }
            return true;
        }
        else if (nextElement == '#')
        {
            switch (Direction)
            {
                case Direction.Up:
                    Direction = Direction.Right;
                    break;
                case Direction.Down:
                    Direction = Direction.Left;
                    break;
                case Direction.Left:
                    Direction = Direction.Up;
                    break;
                case Direction.Right:
                    Direction = Direction.Down;
                    break;
                default:
                    break;
            }
            return true;
        }
        else
        {
            return false;
        }

    }
}

class Day6
{
    const string DAY = "SIX";

    public static void PartOne()
    {
        string input = Tools.ReadFile("6", "input.txt");
        string[] lines = input.Split("\n");

        Map map = new Map(lines);
        (int guardStartX, int guardStartY) = map.GetGuardStartingPosition();

        Guard guard = new Guard(guardStartX, guardStartY);

        int total = 0;

        Dictionary<string, bool> visited = new Dictionary<string, bool>();

        while (true)
        {
            string key = $"x{guard.X}y{guard.Y}";

            if (!visited.ContainsKey(key))
            {
                total++;
                visited[key] = true;
            }

            (int nextX, int nextY) = guard.NextCoordinates();
            char? nextElement = map.GetElement(nextX, nextY);

            if (!guard.Move(nextElement))
            {
                break;
            }
        }

        Console.WriteLine($"The answer to Day {DAY}, part ONE is: {total}");
    }

    public static void PartTwo()
    {
        string input = Tools.ReadFile("6", "input.txt");
        string[] lines = input.Split("\n");

        int total = 0;

        Console.WriteLine($"The answer to Day {DAY}, part TWO is: {total}");
    }
}