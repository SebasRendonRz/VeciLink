using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace VeciLink.Api.Helpers;

public static class LevenshteinHelper
{
    /// <summary>
    /// Normaliza un texto para comparación: minúsculas, sin tildes,
    /// sin caracteres especiales, sin espacios extra.
    /// </summary>
    public static string Normalize(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return string.Empty;

        // 1. Minúsculas
        text = text.ToLowerInvariant();

        // 2. Eliminar tildes (descomponer unicode y quitar marcas de acento)
        var normalized = text.Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder(normalized.Length);
        foreach (var c in normalized)
        {
            if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                sb.Append(c);
        }
        text = sb.ToString().Normalize(NormalizationForm.FormC);

        // 3. Eliminar caracteres especiales (solo letras, números y espacios)
        text = Regex.Replace(text, @"[^a-z0-9\s]", string.Empty);

        // 4. Eliminar espacios extra
        text = Regex.Replace(text, @"\s+", " ").Trim();

        return text;
    }

    /// <summary>
    /// Calcula la distancia de Levenshtein entre dos cadenas.
    /// </summary>
    public static int Distance(string a, string b)
    {
        if (string.IsNullOrEmpty(a)) return b?.Length ?? 0;
        if (string.IsNullOrEmpty(b)) return a.Length;

        var d = new int[a.Length + 1, b.Length + 1];

        for (var i = 0; i <= a.Length; i++) d[i, 0] = i;
        for (var j = 0; j <= b.Length; j++) d[0, j] = j;

        for (var i = 1; i <= a.Length; i++)
        {
            for (var j = 1; j <= b.Length; j++)
            {
                var cost = a[i - 1] == b[j - 1] ? 0 : 1;
                d[i, j] = Math.Min(
                    Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1),
                    d[i - 1, j - 1] + cost);
            }
        }

        return d[a.Length, b.Length];
    }

    /// <summary>
    /// Calcula la similitud entre 0.0 y 1.0 usando distancia Levenshtein normalizada.
    /// Umbral recomendado: 0.70 (70%) — bloquea nombres con ≥70% de caracteres en común.
    /// </summary>
    public static double Similarity(string a, string b)
    {
        if (string.IsNullOrEmpty(a) && string.IsNullOrEmpty(b)) return 1.0;

        var maxLen = Math.Max(a?.Length ?? 0, b?.Length ?? 0);
        if (maxLen == 0) return 1.0;

        var distance = Distance(a ?? string.Empty, b ?? string.Empty);
        return 1.0 - (double)distance / maxLen;
    }
}
