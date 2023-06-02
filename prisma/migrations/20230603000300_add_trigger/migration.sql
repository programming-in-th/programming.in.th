CREATE OR REPLACE FUNCTION public.notify_insert_submission()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	BEGIN
		perform pg_notify('submit', new.id::text);
		return new;
	END;
$function$;

CREATE OR REPLACE FUNCTION public.notify_update_submission()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	declare 
	payload text;
	begin
		payload := row_to_json(new.*)::text;
		perform pg_notify('update', payload);
		return new;
	END;
$function$;

CREATE TRIGGER on_update AFTER update ON public.submission FOR EACH ROW EXECUTE FUNCTION notify_update_submission();

CREATE TRIGGER on_submit AFTER insert ON public.submission FOR EACH ROW EXECUTE FUNCTION notify_insert_submission();