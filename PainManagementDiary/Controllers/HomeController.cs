using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PainManagementDiary.Entities;
using PainManagementDiary.Models;

namespace PainManagementDiary.Controllers {
    public class HomeController : Controller {
        private readonly IPainIncidentRepository _data;

        public HomeController(IPainIncidentRepository data) {
            _data = data;
        }
        public ActionResult Index() {
            return RedirectToAction("Add");
        }

        public ActionResult Add() {
            return View("Index");
        }



        public ActionResult All() {
            var list = _data.GetPainIncidents()
                .OrderBy(d => d.IncidentDate)
                .Select(p => new {
                    id = p.Id,
                    date = string.Format("{0:MM/dd/yyyy}",p.IncidentDate.Date), 
                    time = string.Format("{0:hh:mm tt}",p.IncidentDate),
                    duration = p.Duration,
                    strength = p.Strength,
                    nausea = p.WithNausea ? "Yes" : "No",
                    sharp = p.WithSharpPain ? "Yes" : "No",
                    area = p.Area
                }).ToList();

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Add(PainIncident incident) {
            if (incident == null) {
                throw new Exception("error");
            }

            _data.AddPainIncident(incident);
            _data.SaveChanges();
            
            return Json(new {save = true});
        }

        public ActionResult Delete(int id) {
            if (id == 0) {
                throw new Exception("error");
            }

            var incident = _data.GetPainIncident(id);
            _data.RemovePainIncident(incident);
            _data.SaveChanges();
            
            return new EmptyResult();
        }

    }
}
