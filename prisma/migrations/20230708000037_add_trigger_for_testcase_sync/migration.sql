ALTER TYPE "SyncStatus" ADD VALUE 'DELETE';

CREATE OR REPLACE FUNCTION public.notify_task_sync()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
	declare
		task_id text;
	begin
		task_id := new.task_id;
		if new.sync_status = 'PENDING' or new.sync_status = 'DELETE' then
			perform pg_notify('testcase_sync', task_id);
		end if;
		return new;
	END;
$function$
;


CREATE TRIGGER create_new_task AFTER
INSERT
    OR
UPDATE
    ON
    public.testcase_sync_status for each ROW EXECUTE FUNCTION notify_task_sync();