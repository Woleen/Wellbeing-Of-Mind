namespace wellbeing_of_mind.DTOs
{
    public class QuestionAnswersDto
    {
        public int Id { get; set; }
        public string QuestionContent { get; set; } = string.Empty;
        public IEnumerable<ChoiceDto> Choices { get; set; } = Enumerable.Empty<ChoiceDto>();
    }
}
