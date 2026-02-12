insert into public.categories (slug, translations)
values
('mobility', '{"en":"Mobility","ru":"Мобильность","it":"Mobilità"}'::jsonb),
('strength', '{"en":"Strength","ru":"Сила","it":"Forza"}'::jsonb),
('relax', '{"en":"Relax","ru":"Расслабление","it":"Relax"}'::jsonb)
on conflict (slug) do nothing;

insert into public.lessons (slug, duration_minutes, level, category_id, youtube_id, is_premium, translations)
select * from (
values
('morning-flow-10',10,'beginner',(select id from public.categories where slug='mobility'),'v7AYKMP6rOE',false,
'{"en":{"title":"Morning Flow","description":"Gentle wake-up for spine and hips.","contraindications":"Acute lower back pain"},"ru":{"title":"Утренний флоу","description":"Мягкая разминка для спины и бёдер.","contraindications":"Острая боль в пояснице"},"it":{"title":"Flusso Mattutino","description":"Risveglio dolce per schiena e anche.","contraindications":"Dolore lombare acuto"}}'::jsonb),
('desk-reset-15',15,'beginner',(select id from public.categories where slug='mobility'),'4pKly2JojMw',false,
'{"en":{"title":"Desk Reset","description":"Release neck and shoulders after work.","contraindications":"Recent neck injury"},"ru":{"title":"Разгрузка после офиса","description":"Снимаем напряжение шеи и плеч.","contraindications":"Недавняя травма шеи"},"it":{"title":"Reset da Ufficio","description":"Rilascia collo e spalle dopo il lavoro.","contraindications":"Recente infortunio al collo"}}'::jsonb),
('core-balance-20',20,'intermediate',(select id from public.categories where slug='strength'),'dAqQqmaI9vY',true,
'{"en":{"title":"Core Balance","description":"Build stability with mindful core work.","contraindications":"Pregnancy (consult coach)"},"ru":{"title":"Баланс и кор","description":"Стабильность через осознанную работу с кором.","contraindications":"Беременность (по согласованию)"},"it":{"title":"Core Balance","description":"Stabilità con lavoro consapevole sul core.","contraindications":"Gravidanza (consultare coach)"}}'::jsonb),
('hips-open-20',20,'beginner',(select id from public.categories where slug='mobility'),'w86EalEoFRY',false,
'{"en":{"title":"Open Hips","description":"Mobility focused hip opening class.","contraindications":"Hip replacement"},"ru":{"title":"Раскрытие тазобедренных","description":"Урок на мобильность тазобедренных суставов.","contraindications":"Эндопротез тазобедренного"},"it":{"title":"Anche Aperte","description":"Lezione di mobilità per anche.","contraindications":"Protesi d''anca"}}'::jsonb),
('back-strength-30',30,'advanced',(select id from public.categories where slug='strength'),'L_xrDAtykMI',true,
'{"en":{"title":"Back Strength","description":"Safe back strengthening with breath.","contraindications":"Post-surgery period"},"ru":{"title":"Сильная спина","description":"Укрепление спины с дыханием.","contraindications":"Период после операции"},"it":{"title":"Schiena Forte","description":"Rinforzo della schiena con respiro.","contraindications":"Periodo post-operatorio"}}'::jsonb),
('evening-relax-20',20,'beginner',(select id from public.categories where slug='relax'),'inpok4MKVLM',false,
'{"en":{"title":"Evening Relax","description":"Unwind and reduce stress before sleep.","contraindications":"None"},"ru":{"title":"Вечернее расслабление","description":"Снимаем стресс перед сном.","contraindications":"Нет"},"it":{"title":"Relax Serale","description":"Riduci lo stress prima del sonno.","contraindications":"Nessuna"}}'::jsonb),
('posture-fix-25',25,'intermediate',(select id from public.categories where slug='strength'),'2L2lnxIcNmo',true,
'{"en":{"title":"Posture Fix","description":"Improve posture and upper-back strength.","contraindications":"Severe scoliosis"},"ru":{"title":"Красивая осанка","description":"Улучшаем осанку и силу верхней спины.","contraindications":"Тяжёлый сколиоз"},"it":{"title":"Postura Migliore","description":"Migliora postura e schiena alta.","contraindications":"Scoliosi severa"}}'::jsonb),
('breath-flow-10',10,'beginner',(select id from public.categories where slug='relax'),'SEfs5TJZ6Nk',false,
'{"en":{"title":"Breath Flow","description":"Short breathing-focused flow.","contraindications":"Acute asthma attack"},"ru":{"title":"Дыхательный поток","description":"Короткий поток с фокусом на дыхании.","contraindications":"Острый приступ астмы"},"it":{"title":"Flusso del Respiro","description":"Pratica breve focalizzata sul respiro.","contraindications":"Attacco d''asma acuto"}}'::jsonb),
('legs-power-30',30,'advanced',(select id from public.categories where slug='strength'),'ml6cT4AZdqI',true,
'{"en":{"title":"Legs Power","description":"Strong legs and endurance sequence.","contraindications":"Knee inflammation"},"ru":{"title":"Сильные ноги","description":"Серия на силу ног и выносливость.","contraindications":"Воспаление коленей"},"it":{"title":"Potenza Gambe","description":"Sequenza per forza e resistenza delle gambe.","contraindications":"Infiammazione al ginocchio"}}'::jsonb),
('deep-stretch-20',20,'beginner',(select id from public.categories where slug='relax'),'sTANio_2E0Q',false,
'{"en":{"title":"Deep Stretch","description":"Long holds for deep tissue release.","contraindications":"Hypermobile joints"},"ru":{"title":"Глубокая растяжка","description":"Длительные позиции для мягкого релиза.","contraindications":"Гипермобильность суставов"},"it":{"title":"Stretch Profondo","description":"Tenute lunghe per rilascio miofasciale.","contraindications":"Ipermobilità articolare"}}'::jsonb)
) as v(slug,duration_minutes,level,category_id,youtube_id,is_premium,translations)
on conflict (slug) do nothing;

insert into public.programs (slug, translations)
values ('program-21-back', '{"en":"21-Day Healthy Back","ru":"21 день для здоровой спины","it":"21 giorni per la schiena"}'::jsonb)
on conflict (slug) do nothing;

with p as (
  select id as program_id from public.programs where slug='program-21-back'
), l as (
  select id, row_number() over (order by id) as rn from public.lessons
)
insert into public.program_days (program_id, day_number, lesson_id)
select p.program_id, d.day_number, (
  select id from l where rn = ((d.day_number - 1) % (select count(*) from l)) + 1
)
from p
cross join generate_series(1,21) as d(day_number)
on conflict (program_id, day_number) do nothing;
