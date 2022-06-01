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
    //[Authorize]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly datacontext _context;
        public MoviesController(datacontext context)
        {
            _context = context;
        }


        [HttpGet]
        // return data
        public async Task<IActionResult> GetAllAsync()
        {
            var movies = await _context.Movies.Include(m => m.Genre)
                 .Select(m => new MovieDetailsDto
                 {
                     Id = m.Id,
                     GenreId = m.GenreId,
                     GenreName = m.Genre.Name,
                     Storeline = m.Storeline,
                     Title = m.Title,
                     Year = m.Year,
                     Rate = m.Rate,

                 })

                .ToListAsync();
            return Ok(movies);
        }

        // Get Movie by id
        [HttpGet("id")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            var movie = await _context.Movies.Include(m => m.Genre).SingleOrDefaultAsync(m => m.Id == id);

            //if not found id
            if (movie == null)
                return NotFound();

            var dto = new MovieDetailsDto
            {
                Id = movie.Id,
                GenreId = movie.GenreId,
                GenreName = movie.Genre.Name,
                Storeline = movie.Storeline,
                Title = movie.Title,
                Year = movie.Year,
                Rate = movie.Rate,
            };
            return Ok(dto);

        }

        [HttpPost ("AddMovie")]
        //send data || crate data
        public async Task<IActionResult> CreateAsync(MovieDto dto)
        {
           
            //if id does not exist
            var isValidGenre = await _context.Genres.AnyAsync(g => g.Id == dto.GenreId);
            if (!isValidGenre)
                return BadRequest("Invalid genere ID!");
            var movie = new Movie
            {
                GenreId = dto.GenreId,
                Title = dto.Title,
                Rate = dto.Rate,
                Storeline = dto.Storeline,
                Year = dto.Year,
            };

            _context.AddAsync(movie);
            _context.SaveChanges();

            return Ok(movie);
        }


        ////Update 
        [HttpPut("id")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] MovieDto dto)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
                return NotFound($"We don't have the {id} id, please try again!");

            var isValidGenre = await _context.Genres.AnyAsync(g => g.Id == dto.GenreId);
            if (!isValidGenre)
                return BadRequest("Invalid genere ID!");

            movie.Title = dto.Title;
            movie.GenreId = dto.GenreId;
            movie.Rate = dto.Rate;
            movie.Storeline = dto.Storeline;
            movie.Year = dto.Year;

           _context.Update(movie);
            _context.SaveChanges();

            return Ok(movie);
        }


        //Delete movie by special id 
        [HttpDelete("id")]

        public async Task<IActionResult> DeleteAsync(int id)
        {
            var movie = await _context.Movies.FindAsync(id);

            if (movie == null)
                return NotFound($"We don't have the {id} id, please try again!");

            _context.Remove(movie);
            _context.SaveChanges();

            return Ok(movie);
        }
    }
}
