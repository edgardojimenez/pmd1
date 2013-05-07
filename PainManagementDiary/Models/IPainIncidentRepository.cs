using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PainManagementDiary.Models;

namespace PainManagementDiary.Entities {
    public interface IPainIncidentRepository {
        IEnumerable<PainIncident> GetPainIncidents();

        PainIncident GetPainIncident(int id);
        PainIncident AddPainIncident(PainIncident incident);
        void RemovePainIncident(PainIncident incident);

        int SaveChanges();

    }
}