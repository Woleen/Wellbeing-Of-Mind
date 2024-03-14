using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace wellbeing_of_mind.Domain
{
    public class Question
    {
        [BsonElement("questionId")]
        public int questionId { get; set; }

        [BsonElement("questionContent")]
        public string QuestionContent { get; set; } = string.Empty;
        [BsonElement("choices")]
        public List<Choice> Choices { get; set; } = new List<Choice>();

      
    }
}
