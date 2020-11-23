using System;
using System.ComponentModel.DataAnnotations;

namespace JsonPatchFilterExample.Models
{
    public class WidgetModel
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        [StringLength(128, MinimumLength = 2)]
        public string Title { get; set; }

        [Required]
        [StringLength(1000, MinimumLength = 2)]
        public string Description { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        [Required]
        public DateTime Created { get; set; }
    }
}
