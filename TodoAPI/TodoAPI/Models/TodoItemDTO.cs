﻿namespace TodoAPI.Models
{
    public class TodoItemDTO
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public string? CompletionDate { get; set; }
    }
}
