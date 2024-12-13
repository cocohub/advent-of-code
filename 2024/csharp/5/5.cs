class Day5
{
    const string DAY = "FIVE";

    public static void PartOne()
    {
        string input = Tools.ReadFile("5", "input.txt");
        string[] data = input.Split("\n\n");

        string[] orderRows = data[0].Split("\n");
        Dictionary<string, int> order = new Dictionary<string, int>();


        foreach (string row in orderRows)
        {
            order.Add(row, 1);
        }

        string[] pages = data[1].Split("\n");

        int total = 0;

        foreach (string page in pages)
        {
            List<string> numbers = page.Split(',').ToList();
            bool isValid = true;
            string middle = numbers.ElementAt(numbers.Count / 2);

            while (numbers.Count > 0)
            {
                string n1 = numbers[0];
                numbers.RemoveAt(0);

                foreach (string n2 in numbers)
                {
                    if (order.ContainsKey($"{n2}|{n1}"))
                    {
                        isValid = false;
                        break;
                    }
                }

                if (!isValid)
                {
                    break;
                }
            }

            if (isValid)
            {
                total += int.Parse(middle);
            }
            else
            {
                continue;
            }
        }

        Console.WriteLine($"The answer to Day {DAY}, part ONE is: {total}");
    }

    public static void PartTwo()
    {
        string input = Tools.ReadFile("5", "input.txt");
        string[] data = input.Split("\n\n");

        string[] orderRows = data[0].Split("\n");
        Dictionary<string, int> order = new Dictionary<string, int>();

        foreach (string row in orderRows)
        {
            order.Add(row, 1);
        }

        string[] pages = data[1].Split("\n");

        int total = 0;

        foreach (string page in pages)
        {
            List<string> numbers = page.Split(',').ToList();
            bool isValid = true;

            while (numbers.Count > 0)
            {
                string n1 = numbers[0];
                numbers.RemoveAt(0);

                foreach (string n2 in numbers)
                {
                    if (order.ContainsKey($"{n2}|{n1}"))
                    {
                        isValid = false;
                        break;
                    }
                }

                if (!isValid)
                {
                    break;
                }
            }

            if (!isValid)
            {
                List<string> unorderedNumbers = page.Split(',').ToList();

                while (true)
                {
                    bool swapped = false;

                    for (int i = 0; i < unorderedNumbers.Count - 1; i++)
                    {
                        string n1 = unorderedNumbers[i];
                        string n2 = unorderedNumbers[i + 1];

                        if (order.ContainsKey($"{n2}|{n1}"))
                        {
                            unorderedNumbers[i] = n2;
                            unorderedNumbers[i + 1] = n1;
                            swapped = true;
                        }
                    }

                    if (!swapped)
                    {
                        break;
                    }
                }

                string middle = unorderedNumbers.ElementAt(unorderedNumbers.Count / 2);
                total += int.Parse(middle);
            }
            else
            {
                continue;
            }
        }

        Console.WriteLine($"The answer to Day {DAY}, part TWO is: {total}");
    }
}