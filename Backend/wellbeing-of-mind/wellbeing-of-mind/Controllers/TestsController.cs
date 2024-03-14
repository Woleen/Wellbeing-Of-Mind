using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.Extensions.Caching.Memory;
using wellbeing_of_mind.DTOs;
using wellbeing_of_mind.Infastructure;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using wellbeing_of_mind.Domain;
using MongoDB.Bson;
using MongoDB.Driver;

namespace wellbeing_of_mind.Controllers
{

    [ApiController]
    [Route("api/tests")]
    public class TestsController : Controller

    {
        private readonly IMemoryCache _memoryCache;
        private readonly IMongoCollection<Test> _testCollection;

        public TestsController(IMongoClient mongoClient, IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
            _testCollection = mongoClient.GetDatabase("articles").GetCollection<Test>("Tests");
        }

        [HttpGet]
        public async Task<IActionResult> GetTests(int page = 1, int pageSize = 10)
        {
            try
            {
                if (page <= 0 || pageSize <= 0 || pageSize > 100)
                {
                    return BadRequest("Invalid page or pageSize values. Both must be greater than zero.");
                }

                int skipCount = (page - 1) * pageSize;

                var totalTests = await _testCollection.CountDocumentsAsync(FilterDefinition<Test>.Empty);

                if (skipCount >= totalTests)
                {
                    return NotFound("No tests found for the specified page.");
                }

                var tests = await _testCollection
                      .Find(test => true)
                      .Skip(skipCount)
                      .Limit(pageSize)
                      .Project(test => new
                      {
                          Id = test.Id.ToString(),
                          test.Title,
                          test.Description
                      })
                      .ToListAsync();

                _memoryCache.Set("tests", tests, new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(20)
                });

                return Ok(tests);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchTests(string q, int page = 1, int pageSize = 10)
        {
            try
            {
                if (string.IsNullOrEmpty(q) || page <= 0 || pageSize <= 0 || pageSize > 100)
                {
                    return BadRequest("Invalid search query, page, or pageSize values.");
                }

                int skipCount = (page - 1) * pageSize;

                var filter = Builders<Test>.Filter.Text(q, new TextSearchOptions { CaseSensitive = false });

                var searchResults = await _testCollection
                    .Find(filter)
                    .Skip(skipCount)
                    .Limit(pageSize)
                    .Project(test => new
                    {
                        Id = test.Id.ToString(),
                        test.Title,
                        test.Description,
                        
                       
                    })
                    .ToListAsync();

                if (searchResults.Count == 0)
                {
                    return NotFound("No tests found for the specified search query and page.");
                }

                return Ok(searchResults);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTest(string id)
        {
            try
            {
                if (!ObjectId.TryParse(id, out var objectId))
                {
                    return BadRequest("Invalid ObjectId format");
                }

                var test = await _testCollection.Find(a => a.Id == objectId).FirstOrDefaultAsync();

                if (test == null)
                {
                    return NotFound();
                }

                return Ok(test);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTest(Test test)
        {
            try
            {
                await _testCollection.InsertOneAsync(test);
                return CreatedAtAction(nameof(GetTest), new { id = test.Id }, test);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
