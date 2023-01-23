using Api_GeneratorAngularApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_GeneratorAngularApp.Data
{
    public interface IGeneratorRepository
    {
        IEnumerable<GeneratorInfo> GetAllAppCommands();
        GeneratorInfo GetCommandById(int id);
        void CreateCommand(GeneratorInfo cmd);
        void UpdateCommand(GeneratorInfo cmd);
        void DeleteCommand(GeneratorInfo cmd);
    }
}
