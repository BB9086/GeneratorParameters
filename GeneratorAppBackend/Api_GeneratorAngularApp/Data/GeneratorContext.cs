using Api_GeneratorAngularApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_GeneratorAngularApp.Data
{
    public class GeneratorContext:DbContext
    {
        public GeneratorContext(DbContextOptions<GeneratorContext> opt) :base(opt)
        {

        }
        public DbSet<GeneratorInfo> Generators { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
