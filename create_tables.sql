CREATE TABLE IF NOT EXISTS TRIPS (
    id UUID PRIMARY KEY default uuidv7(),
	title TEXT NOT NULL,
	destinations TEXT[] NOT NULL,
	status trip_status DEFAULT 'idea' NOT NULL,
	start_date DATE,
	end_date DATE CHECK (start_date <= end_date),
	budget INTEGER CHECK (budget >= 0),
	currency currency NOT NULL,
	travellers_count SMALLINT DEFAULT 1 NOT NULL CHECK (travellers_count > 0),
	cover_note TEXT,
	emoji TEXT NOT NULL,
	color TEXT NOT NULL,
	created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT check_trip_dates CHECK (
		(status = 'idea')
		OR
		(status <> 'idea' AND start_date IS NOT NULL AND end_date IS NOT NULL)
	)
);

CREATE OR REPLACE FUNCTION set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  NEW.created_at := OLD.created_at;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_trips_updated_at
BEFORE UPDATE ON trips
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS PACKING_ITEMS (
	id uuid PRIMARY KEY DEFAULT uuidv7(),
	trip_id uuid NOT NULL REFERENCES trips (id) ON DELETE CASCADE,
	label TEXT NOT NULL,
	qty INT NOT NULL DEFAULT 1 CHECK (qty > 0),
	packed BOOL NOT NULL DEFAULT false,
	category TEXT  NOT NULL DEFAULT 'other' CHECK (category IN ('clothes','docs','tech','hygiene','other'))
);

CREATE TABLE IF NOT EXISTS DAYS (
	id uuid PRIMARY KEY DEFAULT uuidv7(),
	trip_id uuid NOT NULL REFERENCES trips (id) ON DELETE CASCADE,
	date DATE NOT NULL,
	title TEXT,
	UNIQUE (trip_id, date),
	UNIQUE (id, trip_id)
);

CREATE OR REPLACE FUNCTION check_day_date() 
RETURNS TRIGGER AS $$
DECLARE
    v_start_date DATE;
    v_end_date   DATE;
BEGIN
	SELECT start_date, end_date 
	INTO v_start_date, v_end_date
  	FROM trips
	WHERE id = NEW.trip_id;
	
	IF NOT FOUND THEN
        RAISE EXCEPTION 'Trip with ID % is not found', NEW.trip_id;
    END IF;

	IF NEW.date < v_start_date OR NEW.date > v_end_date THEN
        RAISE EXCEPTION 'The date % is not included in a range from % to %', 
            NEW.date, v_start_date, v_end_date;
    END IF;

RETURN NEW;

END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE TRIGGER trg_validate_day_date
BEFORE INSERT OR UPDATE ON days
FOR EACH ROW
EXECUTE FUNCTION check_day_date();


CREATE TABLE IF NOT EXISTS ACTIVITIES (
	id uuid PRIMARY KEY DEFAULT uuidv7(),
	trip_id uuid NOT NULL REFERENCES trips (id) ON DELETE CASCADE,
	day_id uuid,
	"order" INT NOT NULL CHECK ("order" >= 0),
	title TEXT NOT NULL,
	type text NOT NULL CHECK (type IN ('sight','food','transport','hotel', 'shopping', 'other')),
	address TEXT,
	url TEXT,
	start_time TIME,
	end_time TIME,
	cost_estimate INT CHECK (cost_estimate >= 0),
	booking_status TEXT CHECK (booking_status IN ('todo', 'booked')),
	note TEXT,
	CHECK (start_time <= end_time),
	UNIQUE (id, trip_id),
	FOREIGN KEY (day_id, trip_id) REFERENCES days (id, trip_id)  ON DELETE SET NULL (day_id)
);

CREATE TABLE IF NOT EXISTS EXPENSES (
	id uuid PRIMARY KEY DEFAULT uuidv7(),
	trip_id uuid NOT NULL REFERENCES trips (id) ON DELETE CASCADE,
	activity_id uuid,
	category TEXT NOT NULL CHECK (category IN ('transport', 'hotel', 'food', 'tickets', 'shopping', 'other')),
	amount INT NOT NULL CHECK (amount > 0),
	currency TEXT NOT NULL CHECK (currency IN ('RUB', 'USD', 'EUR')),
	date DATE NOT NULL,
	note TEXT,
	FOREIGN KEY (activity_id, trip_id) REFERENCES activities (id, trip_id) ON DELETE SET NULL (activity_id)
);

CREATE OR REPLACE TRIGGER trg_validate_expense_date
BEFORE INSERT OR UPDATE ON expenses
FOR EACH ROW
EXECUTE FUNCTION check_day_date();
