using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoAPI.Models;

namespace TodoAPI.Controllers
{
    [Route("api/financialitems")]
    [ApiController]
    public class FinancialItemsController : ControllerBase
    {
        private readonly FinancialContext _context;

        public FinancialItemsController(FinancialContext context)
        {
            _context = context;
        }

        // GET: api/FinancialItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FinancialItem>>> GetFinancialItems()
        {
          if (_context.FinancialItems == null)
          {
              return NotFound();
          }
            return await _context.FinancialItems.ToListAsync();
        }

        // GET: api/FinancialItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FinancialItem>> GetFinancialItem(long id)
        {
          if (_context.FinancialItems == null)
          {
              return NotFound();
          }
            var financialItem = await _context.FinancialItems.FindAsync(id);

            if (financialItem == null)
            {
                return NotFound();
            }

            return financialItem;
        }

        // PUT: api/FinancialItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFinancialItem(long id, FinancialItem financialItem)
        {
            if (id != financialItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(financialItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FinancialItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/FinancialItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FinancialItem>> PostFinancialItem(FinancialItem financialItem)
        {
          if (_context.FinancialItems == null)
          {
              return Problem("Entity set 'FinancialContext.FinancialItems'  is null.");
          }
            _context.FinancialItems.Add(financialItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFinancialItem", new { id = financialItem.Id }, financialItem);
        }

        // DELETE: api/FinancialItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFinancialItem(long id)
        {
            if (_context.FinancialItems == null)
            {
                return NotFound();
            }
            var financialItem = await _context.FinancialItems.FindAsync(id);
            if (financialItem == null)
            {
                return NotFound();
            }

            _context.FinancialItems.Remove(financialItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FinancialItemExists(long id)
        {
            return (_context.FinancialItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
