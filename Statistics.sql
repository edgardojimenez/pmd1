SELECT * FROM PainIncidents order by 2


select COUNT(*) [Count] from PainIncidents

-----------------------------------------------------------



select COUNT(*) [Count] from PainIncidents
-------------------------------------------------------------------

select COUNT(*) CountWithNausea from PainIncidents where WithNausea = 1
select avg(cast(cast(WithNausea as int) as float)) avgWithNausea from PainIncidents 



select COUNT(*) CountWithSharpPain from PainIncidents where WithSharpPain = 1
select COUNT(*) CountWithSharpPain from PainIncidents where WithSharpPain = 1

------------------------------------------------------------------
-- incidents

select COUNT(*), DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0) from PainIncidents
group by DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0)

select AVG(CAST(number AS FLOAT)) AverageIncidentsPerDay from (
select COUNT(*) as number, DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0) as date from PainIncidents
group by DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0)
) as stats

--------------------------------------------------------
--- duration

select min(duration) from PainIncidents 
select max(duration) from PainIncidents
select AVG(duration) as AverageDuration from PainIncidents

select avg(duration) as AvgDuration, DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0) as date from PainIncidents
group by DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0) order by 2

select AVG(AvgDuration) AverageIncidentsPerDay from (
select avg(duration) as AvgDuration, DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0) as date from PainIncidents
group by DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0)
) as stats

----------------------------------------------------
-- strength

select min(Strength) from PainIncidents 
select max(Strength) from PainIncidents 

select AVG(Strength) as Averagestrength from PainIncidents

select avg(Strength) as AvgStrength, DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0) as date from PainIncidents
group by DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0) order by 2

select AVG(AvgStrength) AvgStrengthPerDay from (
select avg(Strength) as AvgStrength, DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0) as date from PainIncidents
group by DATEADD(dd, DATEDIFF(dd, 0, IncidentDate), 0)
) as stats