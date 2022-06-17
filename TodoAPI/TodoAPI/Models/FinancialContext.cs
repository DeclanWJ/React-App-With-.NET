using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace TodoAPI.Models
{
    public class FinancialContext : DbContext
    {

        public FinancialContext(DbContextOptions<FinancialContext> options) : base(options)
        {
        }

        public DbSet<FinancialItem> FinancialItems { get; set; } = null!;

    }
}
