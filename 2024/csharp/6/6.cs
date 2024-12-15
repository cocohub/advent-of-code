class Map(string[] rows)
{
    public string[] Rows { get; set; } = rows;
    public int RowsCount => Rows.Length;
    public int ColsCount => Rows[0].Length;

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

    public void PlaceObstacle(int x, int y)
    {
        char[] line = Rows[y].ToCharArray();
        line[x] = '#';
        Rows[y] = new string(line);
    }
}

public enum Direction
{
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

class Guard(int x, int y)
{
    public Direction Direction { get; set; } = Direction.Up;
    public int X { get; set; } = x;
    public int Y { get; set; } = y;
    public int Moves { get; set; }
    public int Rotations { get; set; }
    public Dictionary<string, (int x, int y)> Visited { get; set; } = [];
    public Dictionary<string, (int x, int y, Direction d)> VisitedWithDirection { get; set; } = [];
    public bool GotStuck { get; set; } = false;
    public bool HasLeft { get; set; } = false;

    public (int x, int y) NextCoordinates()
    {
        return Direction switch
        {
            Direction.Up => (X, Y - 1),
            Direction.Down => (X, Y + 1),
            Direction.Left => (X - 1, Y),
            Direction.Right => (X + 1, Y),
            _ => (-1, -1),
        };
    }

    public bool Move(char? nextElement)
    {
        string key = $"x{X}y{Y}";

        if (!Visited.ContainsKey(key))
        {
            Visited[key] = (X, Y);
        }

        string keyWithDirection = $"x{X}y{Y}d{Direction}";

        if (!VisitedWithDirection.ContainsKey(keyWithDirection))
        {
            VisitedWithDirection[keyWithDirection] = (X, Y, Direction);
        }

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
            Moves++;
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
            Rotations++;
            return true;
        }
        else
        {
            return false;
        }

    }

    public void Patrol(Map map)
    {
        while (true)
        {
            (int nextX, int nextY) = NextCoordinates();
            char? nextElement = map.GetElement(nextX, nextY);

            if (!Move(nextElement))
            {
                HasLeft = true;
                break;
            }

            if (VisitedWithDirection.ContainsKey($"x{X}y{Y}d{Direction}"))
            {
                GotStuck = true;
                break;
            }
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

        Map map = new(lines);
        (int guardStartX, int guardStartY) = map.GetGuardStartingPosition();

        Guard guard = new(guardStartX, guardStartY);
        guard.Patrol(map);

        Console.WriteLine($"The answer to Day {DAY}, part ONE is: {guard.Visited.Count}");
    }

    public static void PartTwo()
    {
        string input = Tools.ReadFile("6", "input.txt");
        string[] lines = input.Split("\n");

        Map map = new(lines);
        (int guardStartX, int guardStartY) = map.GetGuardStartingPosition();

        Guard guard = new(guardStartX, guardStartY);
        guard.Patrol(map);

        int total = 0;

        foreach (var visit in guard.Visited)
        {
            (int x, int y) = visit.Value;

            if ((x, y) != (guardStartX, guardStartY) && map.GetElement(x, y) == '.')
            {
                Map tmpMap = new((string[])lines.Clone());
                tmpMap.PlaceObstacle(x, y);

                Guard tmpGuard = new(guardStartX, guardStartY);
                tmpGuard.Patrol(tmpMap);

                if (tmpGuard.GotStuck)
                {
                    total++;
                }
            };
        }

        Console.WriteLine($"The answer to Day {DAY}, part TWO is: {total}");
    }
}