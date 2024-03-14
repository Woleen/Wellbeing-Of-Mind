using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using wellbeing_of_mind.DTOs;

namespace wellbeing_of_mind.Domain
{
    public class Test
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("description")]
        public string Description { get; set; } = string.Empty;

        [BsonElement("questions")]
        public List<Question> Questions { get; set; } = new List<Question>();
    }
}
