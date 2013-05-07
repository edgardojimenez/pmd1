using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PainManagementDiary.Models {
    public class PainIncident {
        public int Id { get; set; }
        public DateTime IncidentDate { get; set; }
        public decimal Duration { get; set; }
        public bool WithSharpPain { get; set; }
        public bool WithNausea { get; set; }
        public int Strength { get; set; }
        public string Area { get; set; }
    }
}