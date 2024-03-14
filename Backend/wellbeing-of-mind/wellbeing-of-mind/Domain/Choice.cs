using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace wellbeing_of_mind.Domain
{
    public class Choice
    {
        [BsonElement("choiceId")]
        public int choiceId { get; set; }
        [BsonElement("ChoiceContent")]
        public string ChoiceContent { get; set; } = string.Empty;
        [BsonElement("ChoiceType")]
        public string ChoiceType { get; set; } = string.Empty;
        
        
    }
}