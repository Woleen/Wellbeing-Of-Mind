using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using wellbeing_of_mind.Domain;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/articles")]
public class ArticleController : ControllerBase
{
    private readonly IMemoryCache _memoryCache;
    private readonly IMongoCollection<Article> _articleCollection;

    public ArticleController(IMongoClient mongoClient, IMemoryCache memoryCache)
    {
        _memoryCache = memoryCache;
        _articleCollection = mongoClient.GetDatabase("articles").GetCollection<Article>("articles");
    }

    [HttpGet]
    public async Task<IActionResult> GetArticles(int page = 1, int pageSize = 10)
    {
        try
        {
            if (page <= 0 || pageSize <= 0 || pageSize > 100)
            {
                return BadRequest("Invalid page or pageSize values. Both must be greater than zero.");
            }

            int skipCount = (page - 1) * pageSize;

            var totalArticles = await _articleCollection.CountDocumentsAsync(FilterDefinition<Article>.Empty);

            if (skipCount >= totalArticles)
            {
                return NotFound("No articles found for the specified page.");
            }

            var articles = await _articleCollection
                  .Find(article => true)
                  .Skip(skipCount)
                  .Limit(pageSize)
                  .Project(article => new
                  {
                      Id = article.Id.ToString(),
                      article.Title,
                      article.Type,
                      article.Author,
                      article.CreatedAt,
                      article.UpdatedAt
                  })
                  .ToListAsync();

            _memoryCache.Set("articles", articles, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(20)
            });

            return Ok(articles);

        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchArticles(string q, int page = 1, int pageSize = 10)
    {
        try
        {
            if (string.IsNullOrEmpty(q) || page <= 0 || pageSize <= 0 || pageSize > 100)
            {
                return BadRequest("Invalid search query, page, or pageSize values.");
            }

            int skipCount = (page - 1) * pageSize;

            var filter = Builders<Article>.Filter.Text(q, new TextSearchOptions { CaseSensitive = false });

            var searchResults = await _articleCollection
                .Find(filter)
                .Skip(skipCount)
                .Limit(pageSize)
                .Project(article => new
                {
                    Id = article.Id.ToString(),
                    article.Title,
                    article.Type,
                    article.Author,
                    article.CreatedAt,
                    article.UpdatedAt
                })
                .ToListAsync();

            if (searchResults.Count == 0)
            {
                return NotFound("No articles found for the specified search query and page.");
            }

            return Ok(searchResults);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetArticle(string id)
    {
        try
        {
            if (!ObjectId.TryParse(id, out var objectId))
            {
                return BadRequest("Invalid ObjectId format");
            }

            var article = await _articleCollection.Find(a => a.Id == objectId).FirstOrDefaultAsync();

            if (article == null)
            {
                return NotFound();
            }

            return Ok(article);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateArticle([FromBody] Article article)
    {
        try
        {
            string userName = User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                Console.WriteLine("UserName is null");
            }

            article.Author = userName;

            await _articleCollection.InsertOneAsync(article);

            return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }
}