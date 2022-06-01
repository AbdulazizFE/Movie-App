using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NewJWT.Data;
using NewJWT.Dtos;
using NewJWT.Models;

namespace NewJWT.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class GenresController : ControllerBase
    {
        // return 
        private readonly datacontext _context;

        public GenresController(datacontext context)
        {
            _context = context;
        }

        [HttpGet]
        //return data from database 
        public async Task<IActionResult> GetAllAsync()
        {
            var genres = await _context.Genres.OrderBy(g => g.Name).ToListAsync();
            return Ok(genres);
        }

        [HttpPost("CreateGen")]
        // send data to database
        public async Task<IActionResult> CreateAsync(CreateGenreDto dto)
        {
           
          
            
                var genre = new Genre { Name = dto.Name };

                await _context.Genres.AddAsync(genre);
                _context.SaveChanges();

                return Ok(genre);
            
        }
        


        [HttpPut("id")]
        //update data from database

        public async Task<IActionResult> UpdateAsync(int id, [FromBody] CreateGenreDto dto)
        {
            var genre = await _context.Genres.SingleOrDefaultAsync(g => g.Id == id);

            if (genre == null)
                return NotFound($"NO GENRE WAS FOUND WITH ID : {id}");

            genre.Name = dto.Name;
            _context.Update(genre);
            _context.SaveChanges();

            return Ok(genre);
        }

        [HttpDelete("id")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var genre = await _context.Genres.SingleOrDefaultAsync(g => g.Id == id);

            if (genre == null)
                return NotFound($"NO GENRE WAS FOUND WITH ID : {id}");

            _context.Remove(genre);
            _context.SaveChanges();

            return Ok(genre);
        }
    }
}
