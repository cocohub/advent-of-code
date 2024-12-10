using System.Text.RegularExpressions;

class Tools
{
    public static string ReadFile(String filePath, String fileName)
    {
        try
        {
            string file = Path.Combine(filePath, fileName);
            string content = File.ReadAllText(file);
            return content;
        }
        catch (FileNotFoundException)
        {
            throw new Exception($"File not found: {fileName}");
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to read contents of file: {ex.Message}");
        }
    }

    public static string[] SplitByWhitespace(String text)
    {
        return Regex.Split(text.Trim(), @"\s+");
    }
}