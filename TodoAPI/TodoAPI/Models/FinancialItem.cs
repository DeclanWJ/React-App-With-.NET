namespace TodoAPI.Models
{
    public class FinancialItem
    {
        public long Id { get; set; }
        public string? Reason { get; set; }
        public double Amount { get; set; }
        /*public DateTime? CreatedDate { get; set; } Implement a date for the payment*/
    }
}
