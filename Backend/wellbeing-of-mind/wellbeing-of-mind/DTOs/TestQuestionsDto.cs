namespace wellbeing_of_mind.DTOs
{
    public class TestQuestionsDto
    {

        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public IEnumerable<QuestionAnswersDto> Questions { get; set; } = Enumerable.Empty<QuestionAnswersDto>();
    }
}
