using System;

namespace wellbeing_of_mind.Domain
{
    public class SQLArticle
    {
        public int Id { get; set; }
        public string? ArticleId { get; set; }
        public string? Title { get; set; }
        public string? UserId { get; set; }
    }
}