using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace wellbeing_of_mind.Domain
{
    public class Article
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("Title")]
        public string Title { get; set; } = string.Empty;

        [BsonElement("Summary")]
        public string Summary { get; set; } = string.Empty;

        [BsonElement("Type")]
        public string Type { get; set; } = string.Empty;

        [BsonElement("Author")]
        public string Author { get; set; } = string.Empty;

        [BsonElement("Content")]
        public string Content { get; set; } = string.Empty;

        [BsonElement("CreatedAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("UpdatedAt")]
        public DateTime? UpdatedAt { get; set; }
    }
}