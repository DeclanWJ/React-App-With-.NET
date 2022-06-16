namespace TodoAPI.Models
{
    public class TodoItem
    {

        public long Id { get; set; }
        public string? Name { get; set; }
        public DateOnly CompletionDate { get; set; }  
        public string? Secret { get; set; }


    }
}
