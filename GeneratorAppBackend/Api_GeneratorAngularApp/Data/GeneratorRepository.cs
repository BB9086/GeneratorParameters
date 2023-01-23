using Api_GeneratorAngularApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_GeneratorAngularApp.Data
{
    public class GeneratorRepository : IGeneratorRepository
    {
        private readonly GeneratorContext generatorContext;
        public GeneratorRepository(GeneratorContext generatorContext)
        {
            this.generatorContext = generatorContext;
        }
        public void CreateCommand(GeneratorInfo cmd)
        {
            if (cmd == null)
            {
                throw new ArgumentNullException(nameof(cmd));
            }
            generatorContext.Generators.Add(cmd);
            generatorContext.SaveChanges();
        }

        public void DeleteCommand(GeneratorInfo cmd)
        {

            if (cmd == null)
            {
                throw new ArgumentNullException(nameof(cmd));
            }
            generatorContext.Generators.Remove(cmd);
            generatorContext.SaveChanges();
        }

        public IEnumerable<GeneratorInfo> GetAllAppCommands()
        {
            return generatorContext.Generators.ToList();
        }

        public GeneratorInfo GetCommandById(int id)
        {
            return generatorContext.Generators.FirstOrDefault(x => x.Id == id);
        }

        public void UpdateCommand(GeneratorInfo cmd)
        {
            generatorContext.SaveChanges();
        }
    }
}
