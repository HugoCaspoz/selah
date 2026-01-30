-- Semillas de datos para SÉLAH (Luxury Edition)

-- 1. Categorías (Luxury Naming)
insert into public.categories (name_en, name_es, slug) values
('Timeless', 'Atemporal', 'ropa'),           -- Antes Clothing
('Essence', 'Esencia', 'joyeria'),           -- Antes Accessories
('Time', 'Tiempo', 'tiempo'),                -- Nuevo (Relojes)
('Complements', 'Complementos', 'complementos') -- Nuevo
on conflict (slug) do nothing;

-- 2. Productos (Luxury Catalog)
insert into public.products (category_id, slug, name_en, name_es, description_en, description_es, price_eur, price_usd, images, stock, is_active) values
-- ATEMPORAL (Ropa)
(
    (select id from public.categories where slug = 'ropa'),
    'camiseta-silencio-blanca',
    'The Silence T-Shirt',
    'Camiseta El Silencio',
    'Heavyweight organic cotton (280gsm). The void that speaks.',
    'Algodón orgánico de alto gramaje (280gsm). El vacío que habla.',
    55.00,
    60.00,
    ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'],
    100,
    true
),
-- ESENCIA (Joyas)
(
    (select id from public.categories where slug = 'joyeria'),
    'anillo-pausa-plata',
    'Pause Ring .925',
    'Anillo Pausa .925',
    'Handcrafted sterling silver. A reminder to breathe.',
    'Plata de ley hecha a mano. Un recordatorio para respirar.',
    120.00,
    135.00,
    ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800'],
    30,
    true
),
-- TIEMPO (Relojes)
(
    (select id from public.categories where slug = 'tiempo'),
    'reloj-kairos-minimal',
    'Kairos Minimal Watch',
    'Reloj Kairos Minimal',
    'Sapphire crystal. Leather strap. Time is not money, it is life.',
    'Cristal de zafiro. Correa de piel. El tiempo no es dinero, es vida.',
    250.00,
    280.00,
    ARRAY['https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800'],
    15,
    true
);
