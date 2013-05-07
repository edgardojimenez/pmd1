using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PainManagementDiary.Models;

namespace PainManagementDiary.Entities {
    public class PainIncidentRepository : IPainIncidentRepository {
        private DataContext _data;

        public PainIncidentRepository(DataContext data) {
            _data = data;
        }

        public int SaveChanges() {
            return _data.SaveChanges();
        }

        public IEnumerable<PainIncident> GetPainIncidents() {
            return _data.PainIncidents.ToList();
        }

        public PainIncident GetPainIncident(int id) {
            return _data.PainIncidents.SingleOrDefault(p => p.Id == id);
        }

        public PainIncident AddPainIncident(PainIncident incident) {
            return _data.PainIncidents.Add(incident);
        }

        public void RemovePainIncident(PainIncident incident) {
            _data.PainIncidents.Remove(incident);
        }
    }
}