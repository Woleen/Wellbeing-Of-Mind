using System.ComponentModel.DataAnnotations.Schema;
using wellbeing_of_mind.Domain;

namespace wellbeing_of_mind.DTOs
{
    public class ChoiceDto
    {
        public int Id { get; set; }
        public string ChoiceContent { get; set; } = string.Empty;
        public string ChoiceType { get; set; } = string.Empty;
    }
}
