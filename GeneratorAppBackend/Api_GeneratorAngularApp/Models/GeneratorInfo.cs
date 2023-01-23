using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api_GeneratorAngularApp.Models
{
    public class GeneratorInfo
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public decimal ApparentPower_MVA { get; set; }
        [Required]
        public decimal ActivePower_MW { get; set; }
        [Required]
        public decimal PowerFactor { get; set; }
        public string CurrentStorageVol_cubm { get; set; }
        public string Producer { get; set; }
        public string PhotoPath { get; set; }
        public string Location { get; set; }
        public string ProductionYear { get; set; }
    }
}
