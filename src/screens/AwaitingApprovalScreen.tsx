import { CustomIcon } from "@/components/CustomIcon";

export const AwaitingApprovalScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 pt-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <CustomIcon iconName="Clock" size="4xl" />
        </div>

        <div className="space-y-4 text-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Awaiting Approval</h2>
            <p className="mt-2 text-muted-foreground">
              This is a closed product. Your account requires administrator approval before you can
              access the platform.
            </p>
          </div>

          {/* TODO: delete below */}
          <h2 className="text-2xl font-semibold tracking-tight">Welcome Maarten</h2>
          <p className="mt-2 text-muted-foreground">
            As shown above this is a closed product, so normally you would need me to approve. To
            hurry this along I have created an admin account for you.
          </p>
          <ul className="space-y-1 text-left">
            <li>User: maarten@admin.com</li>
            <li>Password: maarten@admin.com</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            This isn't the normal way I would do things but to show off what this can do, stay
            logged in here and open a private/incognito window. You can then click on users and
            approve yourself. There is also the option to change your role to an admin or to block
            your user. Everything is built with sockets so the data will update automatically.
          </p>
          <p className="mt-2 text-muted-foreground">
            All the data is disposable so don't worry about it, I'll delete it in a few days.
          </p>
          <p className="mt-2 text-muted-foreground">
            Just a reminder that this was just a hobby project and by no means is "done", but there
            is plenty that I think is good about it.
          </p>

          {/* <div className="space-y-2 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">What happens next?</p>
            <ul className="space-y-1 text-left">
              <li>• Your account will be reviewed by an administrator</li>
              <li>• You'll receive an email notification once approved</li>
              <li>• This process typically takes 24-48 hours</li>
            </ul>
          </div> */}

          {/* <div className="space-y-2 rounded-lg border bg-card p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Need help?</p>
            <p className="text-left">
              If you have any questions about your account or the approval process, please contact
              the administrator.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
