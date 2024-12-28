const LogPageHeader = () => {
    return (
        <div className="space-y-2">
            <h1 className="page-title">Logs</h1>
            <p>
                Bot process logs, will be showing anything related to the bot
                process such as connecting to socket, whatsapp client, errors,
                etc...
            </p>
        </div>
    )
}

export default LogPageHeader