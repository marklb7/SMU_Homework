--Query 1
select
	e.emp_no,
	e.last_name,
	e.first_name,
	e.sex,
	s.salary
from
	employees e
join salaries s on e.emp_no = s.emp_no

--Query 2
select
	first_name,
	last_name,
	hire_date
from
	employees
where
	extract(year from hire_date) = 1986

--Query 3
select
	d.dept_no,
	d.dept_name,
	e.emp_no,
	e.last_name,
	e.first_name
from
	dept_manager dm
	join departments d on dm.dept_no = d.dept_no
	join employees e on dm.emp_no = e.emp_no

--Query 4
select
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
from
	dept_emp de
	join departments d on de.dept_no = d.dept_no
	join employees e on de.emp_no = e.emp_no

--Query 5
select
	first_name,
	last_name,
	sex
from
	employees
where
	first_name = 'Hercules'
	and last_name like 'B%'

--Query 6
select
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
from
	dept_emp de
	join departments d on de.dept_no = d.dept_no
	join employees e on de.emp_no = e.emp_no
where
	d.dept_name = 'Sales'

--Query 7
select
	e.emp_no,
	e.last_name,
	e.first_name,
	d.dept_name
from
	dept_emp de
	join departments d on de.dept_no = d.dept_no
	join employees e on de.emp_no = e.emp_no
where
	d.dept_name = 'Sales'
	or d.dept_name = 'Development'

--Query 8
select
	last_name,
	count(*) as name_count
from
	employees
group by
	last_name
order by
	name_count desc