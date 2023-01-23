using Api_GeneratorAngularApp.Data;
using Api_GeneratorAngularApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_GeneratorAngularApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GeneratorController : ControllerBase
    {
        private readonly IGeneratorRepository _commanderRepo;
        public GeneratorController(IGeneratorRepository commanderRepo)
        {
            this._commanderRepo = commanderRepo;
        }

        //Route: api/command
        [HttpGet]
        public ActionResult<IEnumerable<GeneratorInfo>> GetAllGenerators()
        {
            var commandItems = _commanderRepo.GetAllAppCommands().OrderByDescending(x=>x.Id);
            return Ok(commandItems);
        }

        //Route: api/command/{id}
        [HttpGet("{id}", Name = "GetCommandById")]
        public ActionResult<GeneratorInfo> GetCommandById(int id)
        {
            var command = _commanderRepo.GetCommandById(id);
            
            if (command != null)
            {

                return Ok(command);
            }
            else
            {
                return NotFound();

            }

        }


        //Post api/command
        [HttpPost]
        public ActionResult<GeneratorInfo> CreateCommand([FromBody] GeneratorInfo createDto)
        {
           
            _commanderRepo.CreateCommand(createDto);

            
            return CreatedAtRoute("GetCommandById", new { id = createDto.Id }, createDto);


        }


        [HttpPut("{id}")]
        public ActionResult UpdateCommand(GeneratorInfo updateDto, int id)
        {
            var commandModFromRepo = _commanderRepo.GetCommandById(id);
            if (commandModFromRepo == null)
            {
                return NotFound();
            }

            commandModFromRepo.Name = updateDto.Name;
            commandModFromRepo.ActivePower_MW = updateDto.ActivePower_MW;
            commandModFromRepo.ApparentPower_MVA = updateDto.ApparentPower_MVA;
            commandModFromRepo.PowerFactor = updateDto.PowerFactor;
            commandModFromRepo.Producer = updateDto.Producer;
            commandModFromRepo.ProductionYear = updateDto.ProductionYear;
            commandModFromRepo.Location = updateDto.Location;
            commandModFromRepo.CurrentStorageVol_cubm = updateDto.CurrentStorageVol_cubm;
            commandModFromRepo.PhotoPath = updateDto.PhotoPath;
           
            _commanderRepo.UpdateCommand(updateDto);
            return NoContent();


        }

        //Delete api/command/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteCommand(int id)
        {
            var commandModFromRepo = _commanderRepo.GetCommandById(id);
            if (commandModFromRepo == null)
            {
                return NotFound();
            }

            _commanderRepo.DeleteCommand(commandModFromRepo);
            return NoContent();


        }

    }
}
