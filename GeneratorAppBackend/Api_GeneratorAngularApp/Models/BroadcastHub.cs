using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api_GeneratorAngularApp.Models
{
    public class BroadcastHub: Hub
    {
        public static int notificationCount=0;
        public async Task SendMessage()
        {
            notificationCount++;
            await Clients.All.SendAsync("MessageReceived", notificationCount.ToString());
        }
    }
}
