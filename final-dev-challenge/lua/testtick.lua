Handlers.add("CronTick", -- handler name
Handlers.utils.hasMatchingTag("Action", "Cron"), -- handler pattern to identify cron message
function() -- handler task to execute on cron message
    ao.send({
        Target = "XaIJVpaLc4GdMRv6lXziGr49pjBvIvcF1iCMa0RnEyk",
        Action = "ManualCron"
    })
end)
